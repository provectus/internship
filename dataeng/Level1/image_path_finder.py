import pathlib
from util import *


def append_to_csv(output_file, user_id: int, path_to_csv: str, user_png: bool) -> bool:
    """
    Given the path to the .csv file and the user id, create the data needed and then
    append it to output_file/output.csv.
    :param output_file: path to where the output file should be.
    :param user_id: user id to be added to the output file.
    :param path_to_csv: path to the .csv file.
    :param user_png: is there a photo for this .csv file.
    :return: true if the output.csv was changed, false if not.
    """
    lines = get_csv(output_file + "/output.csv")
    if not len(lines):
        lines.append(["user_id", "first_name", "last_name", "birthts", "img_path"])
    if user_png:
        jpg_path = path_to_csv[:-4]
        jpg_path += ".png"
    else:
        jpg_path = "None"
    temp = get_csv(path_to_csv)
    line_to_write = [str(user_id), *temp[1], jpg_path]
    for i in range(len(lines)):
        if lines[i][0] == line_to_write[0]:
            if lines[i] == line_to_write:
                return False
            else:
                lines[i] = line_to_write
            break
    else:
        lines.append(line_to_write)
    w = csv.writer(open(output_file + "/output_temp.csv", "w+"))
    w.writerows(lines)
    os.remove(output_file + "/output.csv")
    os.rename(output_file + "/output_temp.csv", output_file + "/output.csv")
    return True


def find_png_and_id(input_path: str) -> (bool, int):
    """
    Takes a path to a .csv file and checks if there's a .png file with the same name in the same directory.
    if the file exists then returns the name of the file (since this is also the user id), if it doesn't exist
    return -1.
    :param input_path: path to the .csv file.
    :return: user id if the file exists or -1 otherwise.
    """
    try:
        user_id = int(pathlib.Path(input_path).stem)
    except ValueError:
        return False, -1
    input_path = input_path[:-4]
    input_path += ".png"
    if os.path.isfile(input_path):
        return True, user_id
    return False, user_id


def process(input_path: str, output_path: str) -> (int, list):
    """
    Reads all files in input_path (absolute path). looks for a .png and a .csv files that have the same name and
    combines them. Stores output in output_path/output.csv.
    Returns the number of files found and their names.
    :param input_path: path used for finding the input.
    :param output_path: path used for finding the output file.
    :return: number of files found and their names.
    """
    if not os.path.exists(os.path.dirname(input_path)):
        raise ValueError("This directory doesn't exist")
    count = 0
    filenames = []
    for filename in sorted(os.listdir(input_path)):
        if filename.endswith('.csv'):
            user_id = find_png_and_id(input_path + "/" + filename)
            if user_id[1] == -1:
                continue
            if append_to_csv(output_path, user_id[1], input_path + "/" + filename, user_id[0]):
                count += 1
                filenames.append(pathlib.Path(filename).stem)
    filenames.sort()
    return count, filenames


if __name__ == "__main__":
    istr = input("Enter the input absolute path: ")
    ostr = input("Enter the output absolute path: ")
    print(process(istr, ostr))
