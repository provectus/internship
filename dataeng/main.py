from minio import Minio
import config
import os
import io
import app
from minio.select import SelectRequest, CSVInputSerialization, CSVOutputSerialization
import db_handler


def get_minio_client(access, secret):
    return Minio(
        config.minio_host + ":9000",
        access_key=access,
        secret_key=secret,
        secure=False
    )


if __name__ == "__main__":
    db_handler.create_table_users()
    minio_client = get_minio_client(config.access_key, config.secret_key)
    if not minio_client.bucket_exists("src"):
        minio_client.make_bucket("src")
    if not minio_client.bucket_exists("res"):
        minio_client.make_bucket("res")

    try:
        minio_client.select_object_content(
                "res",
                "output.csv",
                SelectRequest(
                    "select * from S3Object",
                    CSVInputSerialization(),
                    CSVOutputSerialization(),
                    request_progress=True,
                ),
        )
    except:
        minio_client.put_object(
            "res", "output.csv", io.BytesIO(b"user_id,first_name,last_name,birthts,img_path"), 45,
        )

    app.minio_client = minio_client
    app.input_bucket = "src"
    app.output_bucket = "res"
    port = int(os.environ.get('PORT', 5000))
    app.app.run(host='0.0.0.0', port=port)
