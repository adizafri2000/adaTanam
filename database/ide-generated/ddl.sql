-- generated via IntelliJ IDEA DB Tools

create or replace function public.update_timestamp_function() returns trigger
    language plpgsql
as
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

create or replace function public.reset_all_sequences(reset_value integer DEFAULT 1) returns void
    language plpgsql
as
$$
DECLARE
    table_name text;
    seq_name text;
BEGIN
    FOR table_name IN
        (SELECT tablename FROM pg_tables WHERE schemaname = 'staging')
        LOOP
            IF table_name = 'cart_item' THEN
                CONTINUE;
            END IF;
            seq_name := (SELECT pg_get_serial_sequence('staging.' || quote_ident(table_name), 'id'));
            IF seq_name IS NOT NULL THEN
                EXECUTE format('SELECT setval(%L, %s, false)', seq_name, reset_value);
            END IF;
        END LOOP;
END;
$$;

create or replace function public.update_order_status() returns trigger
    language plpgsql
as
$$
BEGIN
    IF NEW.status = 'completed' THEN
        NEW.is_completed = true;
        NEW.completed_timestamp = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$;

create table if not exists staging.account
(
    id            serial
        primary key,
    email         varchar(50)  not null,
    password_hash varchar(100) not null,
    name          varchar(70),
    phone         varchar(11),
    bank_number   varchar(20),
    bank_name     varchar(40),
    type          varchar(8)   not null,
    is_active     boolean      not null,
    created_at    timestamp default now(),
    updated_at    timestamp default now()
);

create trigger update_account
    before update
    on staging.account
    for each row
execute procedure public.update_timestamp_function();

create table if not exists staging.store
(
    id          serial
        primary key,
    name        varchar(15) not null,
    location    point,
    bank_name   varchar(20) not null,
    bank_number varchar(20) not null,
    farmer      integer     not null
        unique
        references staging.account,
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);

create trigger update_store
    before update
    on staging.store
    for each row
execute procedure public.update_timestamp_function();

create table if not exists staging.produce
(
    id           serial
        primary key,
    name         varchar(15) not null,
    type         varchar(15) not null,
    stock        integer     not null,
    unit_price   numeric     not null,
    selling_unit varchar(10) not null,
    description  varchar(100),
    status       varchar(20) not null,
    store        integer     not null
        references staging.store,
    created_at   timestamp default now(),
    updated_at   timestamp default now()
);

create trigger update_produce
    before update
    on staging.produce
    for each row
execute procedure public.update_timestamp_function();

create table if not exists staging.cart
(
    id         serial
        primary key,
    is_active  boolean not null,
    account    integer not null
        references staging.account,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create trigger update_cart
    before update
    on staging.cart
    for each row
execute procedure public.update_timestamp_function();

create table if not exists staging.cart_item
(
    cart       integer not null
        references staging.cart,
    produce    integer not null
        references staging.produce,
    quantity   integer not null,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create trigger update_cart_item
    before update
    on staging.cart_item
    for each row
execute procedure public.update_timestamp_function();

create table if not exists staging."order"
(
    id                  serial
        primary key,
    account             integer                 not null
        references staging.account,
    store               integer                 not null
        references staging.store,
    cart                integer                 not null
        references staging.cart,
    order_timestamp     timestamp default now() not null,
    pickup              timestamp               not null,
    is_completed        boolean   default false not null,
    completed_timestamp timestamp,
    status              varchar(15)             not null,
    rating              integer,
    review              varchar(100),
    created_at          timestamp default now(),
    updated_at          timestamp default now()
);

create trigger order_status_update
    before update
        of status
    on staging."order"
    for each row
execute procedure public.update_order_status();

create trigger update_order
    before update
    on staging."order"
    for each row
execute procedure public.update_timestamp_function();

create table if not exists staging.payment
(
    id                serial
        primary key,
    "order"           integer                 not null
        references staging."order",
    total_price       numeric                 not null,
    payment_timestamp timestamp default now() not null,
    method            varchar(10)             not null,
    created_at        timestamp default now(),
    updated_at        timestamp default now()
);

create trigger update_payment
    before update
    on staging.payment
    for each row
execute procedure public.update_timestamp_function();

