-- Begin function declarations

-- Create a utility function to reset all sequences
CREATE OR REPLACE FUNCTION staging.reset_all_sequences(reset_value integer DEFAULT 1)
    RETURNS void AS $$
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
$$ LANGUAGE plpgsql;

-- timestamp updates for all tables.current_timestamp
create or replace function staging.update_timestamp_function() returns trigger
    language plpgsql
as
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Create a function to update is_completed and completed_timestamp
CREATE OR REPLACE FUNCTION staging.update_order_status()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' THEN
        NEW.is_completed = true;
        NEW.completed_timestamp = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- End function declarations


-- Begin trigger declarations to end of file

-- Create a trigger that calls the function when status is updated
CREATE or replace TRIGGER order_status_update
    BEFORE UPDATE OF status ON staging.order
    FOR EACH ROW
EXECUTE PROCEDURE staging.update_order_status();


-- create or replace triggers for all tables
create or replace trigger update_account
    before update
    on staging.account
    for each row
execute procedure staging.update_timestamp_function();

create or replace trigger update_store
    before update
    on staging.store
    for each row
execute procedure staging.update_timestamp_function();

create or replace trigger update_produce
    before update
    on staging.produce
    for each row
execute procedure staging.update_timestamp_function();

create or replace trigger update_cart
    before update
    on staging.cart
    for each row
execute procedure staging.update_timestamp_function();

create or replace trigger update_cart_item
    before update
    on staging.cart_item
    for each row
execute procedure staging.update_timestamp_function();

create or replace trigger update_order
    before update
    on staging.order
    for each row
execute procedure staging.update_timestamp_function();

create or replace trigger update_payment
    before update
    on staging.payment
    for each row
execute procedure staging.update_timestamp_function();

