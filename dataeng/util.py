import csv
from minio import Minio
from minio.select import SelectRequest, CSVInputSerialization, CSVOutputSerialization


def millisecond_to_years(x):
    """
    Turns x millisecond to years.
    :param x: number of milliseconds.
    :return: the equivalent number of years.
    """
    return x / 31556952000


def check_image(row, image_filter):
    """
    Checks if a certain row in the output.csv file correctly passes the filter.
    :param row: an entry in the .csv file.
    :param image_filter: True, False, or None.
    :return: if it passes or not.
    """
    if image_filter is None:
        return True
    if image_filter:
        if row[-1] != "None":
            return True
    if not image_filter:
        if row[-1] == "None":
            return True
    return False


def check_min_age(row, min_age_filter):
    """
    Checks if a certain row in the output.csv file correctly passes the filter.
    :param row: an entry in the .csv file.
    :param min_age_filter: minimum age in years.
    :return: if it passes or not.
    """
    if min_age_filter == -1:
        return True
    if millisecond_to_years(int(row[-2])) >= min_age_filter:
        return True
    return False


def check_max_age(row, max_age_filter):
    """
    Checks if a certain row in the output.csv file correctly passes the filter.
    :param row: an entry in the .csv file.
    :param max_age_filter: maximum age in years.
    :return: if it passes or not.
    """
    if max_age_filter == -1:
        return True
    if millisecond_to_years(int(row[-2])) <= max_age_filter:
        return True
    return False


def get_csv(minio_client: Minio, bucket: str, obj: str, num_col: int):
    """
    Given an absolute path to a .csv, returns the contents of the csv file.
    :param path: path to the .csv
    :return: contents of the csv file.
    """
    with minio_client.select_object_content(
            bucket,
            obj,
            SelectRequest(
                "select * from S3Object",
                CSVInputSerialization(),
                CSVOutputSerialization(),
                request_progress=True,
            ),
    ) as result:
        for data in result.stream():
            x = data.decode().replace("\n", ",").split(",")
            for i in range(len(x)):
                x[i] = x[i].strip('"').strip(" ")
    y = [i for i in x if i != ""]
    ans = []
    k = 0
    temp = []
    for i in y:
        if not k:
            ans.append(temp.copy())
            temp.clear()
        temp.append(i)
        k += 1
        k %= num_col
    ans.append(temp.copy())
    ans = ans[1:]
    return ans


def put_csv(path: str, lines: list):
    w = csv.writer(open(path, "w+"))
    w.writerows(lines)
