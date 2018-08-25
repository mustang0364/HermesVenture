create table users (
    id serial primary key,
    name text NOT NULL,
    email text NOT NULL
)

create table products (
    id serial primary key,
    title text,
    category text,
    price integer,
    image text,
    description text
)

create table cart  (
    id serial primary key,
    user_id int references users(id)
)

create table quantity (
    id serial primary key,
    product_id int references products(id),
    quantity int,
    cart_id int references cart(id)
)

create table orders  (
    id serial primary key,
    product_id int references products(id),
    cart_id int references cart(id),
    quantity int references quantity(id)
)

create table addresses (
    id serial primary key,
    street text,
    city text,
    state varchar(2),
    zip varchar(5),
    user_id int references users(id)
)