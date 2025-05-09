# 🏨 API системы бронирования отелей

## 🔐 Авторизация
| Метод | Путь              | Описание                     | Аутентификация |
|-------|-------------------|------------------------------|:--------------:|
| POST  | `/auth/login`     | Вход в систему               |       🔐       |

## 🛎 Бронирования
| Метод | Путь                          | Описание                          | Аутентификация |
|-------|-------------------------------|-----------------------------------|:--------------:|
| POST  | `/booking/:id`                | Создать бронирование              |       🔐       |
| GET   | `/booking/:roomId/occupied-dates` | Занятые даты номера            |                |
| GET   | `/booking`                     | Мои бронирования                 |       🔐       |

## ⭐ Отзывы
| Метод | Путь                  | Описание                     | Аутентификация |
|-------|-----------------------|------------------------------|:--------------:|
| POST  | `/review/:id`         | Добавить отзыв               |       🔐       |
| GET   | `/review/:id`         | Отзывы о номере              |                |
| GET   | `/review/:id/reviewCount` | Количество отзывов       |                |
| PATCH | `/review/:id`         | Редактировать отзыв          |                |
| DELETE| `/review/:id`         | Удалить отзыв                |                |

## 🏠 Номера
| Метод | Путь      | Описание                     | Аутентификация |
|-------|-----------|------------------------------|:--------------:|
| POST  | `/room`   | Добавить номер               |                |
| GET   | `/room`   | Поиск номеров (с фильтрами)  |                |
| GET   | `/room/:id` | Информация о номере        |                |
| PATCH | `/room/:id` | Обновить номер             |                |
| DELETE| `/room/:id` | Удалить номер             |                |

## 👤 Пользователи
| Метод | Путь            | Описание               | Аутентификация |
|-------|-----------------|------------------------|:--------------:|
| POST  | `/user`         | Регистрация            |                |
| GET   | `/user`         | Все пользователи       |                |
| GET   | `/user/profile` | Мой профиль            |       🔐       |

## ❤️ Избранное
| Метод | Путь                    | Описание                     | Аутентификация |
|-------|-------------------------|------------------------------|:--------------:|
| POST  | `/favorite-rooms`       | Добавить/удалить избранное   |       🔐       |
| GET   | `/favorite-rooms`       | Мои избранные номера         |       🔐       |
| GET   | `/favorite-rooms/:roomId` | Проверить избранное       |       🔐       |

## 🛠 Параметры запросов

### Поиск номеров (`GET /room`)
```http
GET /room?page=1&limit=10&sort=price&minPrice=1000&maxPrice=5000
```
Страница входа/регистрации
![image](https://github.com/user-attachments/assets/e81fb895-bfd8-46a1-96f8-c9219179c03c)
![image](https://github.com/user-attachments/assets/26186f1d-2bea-4c5a-9f9f-f31763470210)

Главная страница(список номеров с пагинацией и фильтрацией по параметрам)
![image](https://github.com/user-attachments/assets/eeb38141-2d63-4132-a283-db2d261f225f)

Страница номера(бронирование + проверка на то что в указанный период номер не занят)
![image](https://github.com/user-attachments/assets/b4f44066-aff0-4092-83cd-50e5f16b742e)

Страница список моих бронирований
![image](https://github.com/user-attachments/assets/e9283076-a95d-459e-8108-395a478bb7cd)

Страница список понравившихся номеров 
![image](https://github.com/user-attachments/assets/aa18bd97-7b6c-4b4b-b28e-907641c22908)


Профиль 
![image](https://github.com/user-attachments/assets/4a922473-28ab-403e-9041-3e4d9416de1f)

