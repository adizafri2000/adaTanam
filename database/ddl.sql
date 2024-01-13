create schema if not exists testing;

-- account table
create table if not exists testing.account
(
    id            serial primary key,
    email         varchar(50)  not null,
    password_hash varchar(100) not null,
    name          varchar(70),
    phone         varchar(11),
    bank_number   varchar(20),
    bank_name     varchar(40),
    type          varchar(8)   not null,
    is_active     boolean      not null
);

-- store table
create table if not exists testing.store
(
    id          serial      primary key,
    name        varchar(15) not null,
    location    point,
    bank_name   varchar(20) not null,
    bank_number varchar(20) not null,
    farmer integer unique not null references testing.account
);

-- produce table
create table if not exists testing.produce
(
    id          serial      primary key,
    name        varchar(15) not null,
    type        varchar(15) not null,
    stock int not null,
    unit_price numeric not null,
    selling_unit varchar(10) not null,
    description varchar(100),
    status varchar(20) not null,
    store integer unique not null references testing.store
);

-- cart table
create table if not exists testing.cart
(
    id serial primary key,
    is_active boolean not null,
    account integer unique not null references testing.account
);

-- cart_item table
create table if not exists testing.cart_item
(
    cart integer not null references testing.cart,
    produce integer not null references testing.produce,
    quantity int not null
);

-- payment table
create table if not exists testing.payment
(
    id serial primary key,
    account integer not null references testing.account,
    store integer not null references testing.store,
    cart integer not null references testing.cart,
    total_price numeric not null,
    payment_timestamp timestamp not null,
    method varchar(10) not null,
    status varchar(10) not null
);

-- order table
create table if not exists testing.order
(
    id serial primary key,
    account integer not null references testing.account,
    store integer not null references testing.store,
    cart integer not null references testing.cart,
    payment integer not null references testing.payment,
    order_timestamp timestamp not null,
    pickup timestamp not null,
    is_completed boolean not null,
    completed_timestamp timestamp,
    status varchar(15) not null,
    rating int,
    review varchar(100)
);



