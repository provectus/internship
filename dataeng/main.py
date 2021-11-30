# Import necessary libraries
import csv
import os
from os import listdir
from os.path import isfile, join
import pandas as pd
from pathlib import Path

# Fixed Paths variables
home = str(Path.home())
wd = join(home, 'internship/dataeng')
src_wd = join(wd, '02-src-data')
prc_wd = join(wd, 'processed_data')
out_wd = join(prc_wd, 'output.csv')

# Working mode
wor_mode = "press 1 for reading the source files and updating the output file \n" \
           "press 2 for editing the processed data \n" \
           "press any other key to quit"


def main():
    print(wor_mode)
    wor_sel = input()

    if wor_sel == '1':
        df = check_processed_file(prc_wd, src_wd)
        flag = df.empty
        if not flag:
            headers, data_rows = read_all_csv(src_wd)
            ndf = pd.DataFrame(data_rows, columns=headers)
            ndf['user_id'] = ndf['user_id'].astype('int64')
            filtered_df = pd.concat([df, ndf]).drop_duplicates(subset=['user_id']).reset_index(drop=True)
            write_df_csv(out_wd, headers, data_rows, filtered_df)
        else:
            headers, data_rows = read_all_csv(src_wd)
            write_df_csv(out_wd, headers, data_rows)

    elif wor_sel == '2':
        df = check_processed_file(prc_wd, src_wd)
        flag = df.empty
        if not flag:
            try:
                user_id = int(input("Please enter the user id to edit"))
                user_idx = df[df['user_id'] == user_id].index.values[0]
                user_in = input("New first name")
                df.at[user_idx, "first_name"] = user_in
                user_in = input("New last name")
                df.at[user_idx, " last_name"] = user_in
                print(df)
                write_df_csv(out_wd, dataframe=df)
            except:
                print("Please enter the id number of the user")
    else:
        print("No database available yet")
    return None


def read_csv_simple(file_dir):
    with open(file_dir, encoding='utf-8') as csv_file:
        data = list(csv.reader(csv_file, delimiter=','))
        return data[0], data[1]


def read_all_csv(src_wd):
    headers = []
    data_rows = []
    onlyfiles = [f for f in listdir(src_wd) if isfile(join(src_wd, f))]

    for file_path in onlyfiles:
        fp = join(src_wd, file_path)
        # Split the extension from the path and normalise it to lowercase.
        ext = os.path.splitext(fp)[-1].lower()
        fp_wo_ext = os.path.splitext(fp)[0].lower()
        # Now we can simply use == to check for equality, no need for wildcards.
        if ext == ".csv":
            headers, data = read_csv_simple(fp)
            user_id = f"{fp_wo_ext[-4:]}"
            img_fp = f"{fp_wo_ext}.png"
            data.insert(0, f"{user_id}")
            data.append(f"{img_fp}")
            data_rows.append(data)
    headers.insert(0, 'user_id')
    headers.append('img_path')
    return headers, data_rows


def write_df_csv(out_wd, headers=None, data=None, dataframe=pd.DataFrame()):
    flag = dataframe.empty
    if not flag:
        dataframe.to_csv(out_wd, index=False, encoding="utf-8")
    else:
        df = pd.DataFrame(data, columns=headers)
        df.to_csv(out_wd, index=False, encoding="utf-8")
    return True


def check_processed_file(prc_wd, src_wd):
    flag = os.path.exists(out_wd)
    if flag:
        df = pd.read_csv(out_wd, encoding="utf-8")
        return df
    else:
        try:
            os.mkdir(prc_wd)
        except:
            print("processed folder exists")
        return pd.DataFrame()


if __name__ == '__main__':
    main()
