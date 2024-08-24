export const appMessages = {
  toasts: {
    login: { error: 'Ошибка входа' },
    create: { error: 'Ошибка создания' },
    delete: { error: 'Ошибка удаления' },
    usersList: { error: 'Ошибка получения пользователей' }
  },
  validation: {
    required: 'Обязательное поле',
    min(number: number) {
      return `Длинна должна быть ${number}`
    }
  },
  confirm: {
    delete: 'Это действие нельзя будет отменить'
  }
}