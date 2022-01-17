# Hướng dẫn chạy chương trình

| Members          | ID       |
| ---------------- | -------- |
| Lê Đức Tâm       | 19120644 |
| Nguyễn Kha Vĩ    | 19120715 |
| Ngô Huỳnh Hải Vy | 19120730 |

## Chạy website bán hàng (port: 9595):

-   Ở thư mục gốc là Source, chạy lệnh:
    `cd shop && npm i && npm start`

## Chạy website admin (port: 9999):

-   Ở thư mục gốc là Source, chạy lệnh:
    `cd admin && npm i && npm start`
-   Tài khoản đăng nhập:
    -   Username: adminNew
    -   Password: 123456

## Database (MongoDB Atlas):

-   URI (onlineshopping): `mongodb+srv://nguyenkhavi:UOjjTNgrEGsk6TDh@cluster0.vo4ad.mongodb.net/onlineshopping`.
-   Dùng compass import data từ file json trong thư mục Database.
-   Đổi URI trong .env (.development.env) theo host tương ứng.
