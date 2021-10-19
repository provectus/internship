import psycopg2
import config


def init():
    """
    Initiates the connection with the database 'dbname'
    :return: (conn, crsr) -> (the connection object, the cursor to perform commands)
    """
    conn = psycopg2.connect(dbname=config.db_name, user=config.user,
                            password=config.password, host=config.db_host)
    return conn, conn.cursor()


def get_users_data(table_name):
    """
    Retrieves all the data in the table table_name
    :param table_name: the name of the table
    :return: a list that contains all the data in the table

    NOTE:
    the returned list will contain all the information about the users right after each other
    without having each user in a separate list.
    For example: returned_list = [user_id1, first_name1, last_name1, birthdate1, img_path1, user_id2, first_name2, .....]
    """
    conn, crsr = init()

    crsr.execute(f"SELECT user_id, first_name, last_name, birthdate, img_path FROM {table_name};")
    data = crsr.fetchall()

    conn.commit()
    crsr.close()
    conn.close()

    res = []
    for row in data:
        res.append(row)
    return res


def get_ids(table_name):
    """
    Retrieves all the ids of the users inside the 'table_name' table
    :param table_name: the name of the table
    :return: a list of the ids of the users inside the table
    """
    conn, crsr = init()

    crsr.execute(f"SELECT user_id FROM {table_name};")
    ids = crsr.fetchall()

    conn.commit()
    conn.close()
    crsr.close()

    return [id[0] for id in ids]


def update_row(table_name, user):
    """

    :param user: [first_name, last_name, birthts, img_path, user_id]
    :return:
    """
    conn, crsr = init()

    user = [user[1], user[2], user[3], user[4], user[0]]

    crsr.execute(f"""
        UPDATE {table_name} SET first_name = %s, last_name = %s, 
        birthdate = %s, img_path = %s WHERE user_id = %s;
        """, user)

    conn.commit()
    conn.close()


def insert_row(table_name, user):
    conn, crsr = init()

    crsr.execute(
        f"INSERT INTO {table_name} (user_id, first_name, last_name, birthdate, img_path) "
        f"VALUES (%s, %s, %s, %s, %s)", user)

    conn.commit()
    conn.close()


def create_table_users():
    """
    Creates the table users that we will use to migrate our data from output.csv to.
    """
    conn, crsr = init()

    crsr.execute("""
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY NOT NULL,
                user_id varchar (20) NOT NULL,
                first_name varchar (30) NOT NULL,
                last_name varchar (30) NOT NULL,
                birthdate varchar (30) NOT NULL,
                img_path varchar (250) NOT NULL
            );
        """)

    conn.commit()
    crsr.close()
    conn.close()
