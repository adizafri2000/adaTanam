create schema if not exists staging;

-- account table
create table if not exists staging.account
(
    id            serial primary key,
    email         varchar(50)  not null,
    password_hash varchar(100) not null,
    name          varchar(70),
    phone         varchar(11),
    bank_number   varchar(20),
    bank_name     varchar(40),
    type          varchar(8)   not null,    -- admin, farmer, consumer
    is_active     boolean      not null,
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);

-- store table
create table if not exists staging.store
(
    id          serial      primary key,
    name        varchar(15) not null,
    location    point,
    bank_name   varchar(20) not null,
    bank_number varchar(20) not null,
    farmer integer unique not null references staging.account,
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);

-- produce table
create table if not exists staging.produce
(
    id          serial      primary key,
    name        varchar(15) not null,
    type        varchar(15) not null,   -- fruits, vegetables
    stock int not null,
    unit_price numeric not null,
    selling_unit varchar(10) not null,  -- kg, g, piece, bag, box
    description varchar(100),
    status varchar(20) not null,    -- available, out of stock, pending harvest
    store integer not null references staging.store,
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);

-- cart table
create table if not exists staging.cart
(
    id serial primary key,
    is_active boolean not null,
    account integer not null references staging.account,
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);

-- cart_item table
create table if not exists staging.cart_item
(
    cart integer not null references staging.cart,
    produce integer not null references staging.produce,
    quantity int not null,
    created_at  timestamp default now(),
    updated_at  timestamp default now(),
    primary key (cart, produce)
);

-- order table
create table if not exists staging.order
(
    id serial primary key,
    account integer not null references staging.account,
    store integer not null references staging.store,
    cart integer not null references staging.cart,
    order_timestamp timestamp not null default now(),
    pickup timestamp not null,
    is_completed boolean not null default false,
    completed_timestamp timestamp,
    status varchar(15) not null,    -- processing, ready, completed, cancelled
    rating int, -- 1-5
    review varchar(100),
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);

-- payment table
create table if not exists staging.payment
(
    id serial primary key,
    "order" integer not null references staging.order,
    total_price numeric not null,
    payment_timestamp timestamp not null default now(),
    method varchar(10) not null,    -- cash, online
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);
