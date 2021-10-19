import os
import csv

input_path_real_data = "/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/src-data"
output_path_real_data = "/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/processed_data"
input_path_test_data = "/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/unittests/demo-data"
output_path_test_data = "/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/unittests/demo-output"


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


def get_csv(path):
    """
    Given an absolute path to a .csv, returns the contents of the csv file.
    :param path: path to the .csv
    :return: contents of the csv file.
    """
    if not os.path.isfile(path):
        f = open(path, "w+")
        f.close()
    reader = csv.reader(open(path, "r+"), delimiter=',', quoting=csv.QUOTE_NONE)
    temp = [[x.strip() for x in row] for row in reader]
    return temp
