import { FocusEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import { ITodoListItem } from './types/todoListTypes';

function caretAtEnd(elem: HTMLTextAreaElement) {
  const elemLen = elem.value.length;
  if (elem.selectionStart || elem.selectionStart === 0) {
    elem.selectionStart = elemLen;
    elem.selectionEnd = elemLen;
    elem.focus();
  }
}

export function useTodoListEdit(
  items: ITodoListItem[],
  setItems: (items: ITodoListItem[]) => void,
  editMode: boolean,
  containerClassName: string,
  itemClassName: string,
) {
  const listRef = useRef<HTMLDivElement>(null);
  const prevKeys = useRef<string[]>([]);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const getInputElement = useCallback(
    (itemKey: string) => {
      const elems = Array.from(
        listRef.current
          ?.querySelector(`.${containerClassName}`)
          ?.querySelectorAll(`.${itemClassName}`) ?? [],
      ).map((el) => el as HTMLElement);

      const elem = elems.find((el) => el.dataset.key === itemKey);

      elem?.scrollIntoView({
        behavior: 'smooth',
      });

      return elem?.querySelector('textarea');
    },
    [listRef.current, containerClassName, itemClassName],
  );

  const focus = useCallback(
    (itemKey: string) => {
      const elem = getInputElement(itemKey);

      elem && caretAtEnd(elem);
    },
    [getInputElement],
  );

  const set = useCallback(
    (
      itemKey: string,
      field: 'label' | 'checked',
      newValue: string | boolean,
    ) => {
      const fn = (item: ITodoListItem) => item.key === itemKey;
      const item = items.find(fn);
      if (item) {
        const index = items.findIndex(fn);
        (item[field] as ITodoListItem[typeof field]) = newValue;
        setItems([
          ...items.slice(0, index),
          item,
          ...items.slice(index + 1),
        ]);
      }
    },
    [items, setItems],
  );

  const add = useCallback(
    (after?: number) => {
      if (after === undefined) {
        after = items.length - 1;
      }
      setItems([
        ...items.slice(0, after + 1),
        { key: 'todo_' + Date.now().toString(), label: '', checked: false },
        ...items.slice(after + 1),
      ]);
    },
    [items, setItems],
  );

  const remove = useCallback(
    (itemKey: string) => {
      setItems(items.filter((todo) => todo.key !== itemKey));
    },
    [items, setItems],
  );

  const handleInputKeyPress = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>, itemKey: string) => {
      const { code } = e;
      const value = items.find((item) => item.key === itemKey)?.label ?? '';
      const itemIndex = items.findIndex((item) => item.key === itemKey);

      const removeEmpty = () => {
        if (!value.length) {
          remove(itemKey);
        }
      };

      switch (code) {
        case 'Enter': {
          if (value.length) {
            add(itemIndex);
          }
          break;
        }
        case 'Backspace': {
          if (!value.length && items.length > 1) {
            e.preventDefault();
            let index = itemIndex - 1;
            if (index < 0) {
              index = 1;
            }
            remove(itemKey);
            focus(items[index].key);
          }
          break;
        }
        case 'ArrowUp': {
          if (itemIndex) {
            e.preventDefault();
            focus(items[itemIndex - 1].key);
            removeEmpty();
          }
          break;
        }
        case 'ArrowDown': {
          if (itemIndex < items.length - 1) {
            e.preventDefault();
            focus(items[itemIndex + 1].key);
            removeEmpty();
          }
          break;
        }
      }
    },
    [items, add, set],
  );

  const handleInput = useCallback(
    (e: FormEvent<HTMLTextAreaElement>, itemKey: string) => {
      const target = e.target as HTMLInputElement;
      set(itemKey, 'label', target.value.replace(/\n/g, ''));
    },
    [set],
  );

  const handleBlur = useCallback(
    ({ target }: FocusEvent<HTMLTextAreaElement>, itemKey: string) => {
      const item = items.find((t) => t.key === itemKey);
      if (item?.label.length === 0 && items.length > 1) {
        setItemToRemove(() => itemKey);
      }
    },
    [items],
  );

  useEffect(() => {
    if (!items.length && editMode) {
      add(0);
    }
  }, [items.length, editMode]);

  useEffect(() => {
    const clickHandler = () => {
      if (itemToRemove) {
        remove(itemToRemove);
        setItemToRemove(() => null);
      }
    };

    window.addEventListener('click', clickHandler);

    return () => window.removeEventListener('click', clickHandler);
  }, [itemToRemove, remove]);

  useEffect(() => {
    const itemKeys = items.map((item) => item.key);

    if (listRef.current && !prevKeys.current.length) {
      prevKeys.current = itemKeys;
      return;
    }

    if (prevKeys.current.length !== itemKeys.length) {
      if (prevKeys.current.length < itemKeys.length) {
        focus(itemKeys.find((key) => !prevKeys.current.includes(key)) ?? '');
      }
      prevKeys.current = itemKeys;
    }
  }, [listRef.current, prevKeys.current, items]);

  return {
    handleInputKeyPress,
    handleInput,
    handleBlur,
    listRef,
  };
}
