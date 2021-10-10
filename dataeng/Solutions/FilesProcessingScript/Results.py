# Jupiter notebook was used for running the following code.

import csv

import pandas as pd

def get_url(position):
    return ('https://raw.githubusercontent.com/provectus/internship/main/dataeng/02-src-data/' + str(position) + '.csv')


def get_data():
    data = {'user_id': [], 'first_name': [], 'last_name': [], 'birthts': [], 'img_path': []}

    for position in range(1000, 1100):
        temp_df = pd.read_csv(get_url(position))

        user_id = position
        first_name = temp_df.loc[0, 'first_name']
        last_name = temp_df.loc[0, ' last_name']
        birthts = temp_df.loc[0, ' birthts']
        img_path = 'https://github.com/provectus/internship/' \
                    + 'blob/main/dataeng/02-src-data/' + str(user_id) + '.png'


        data['user_id'].append(user_id)
        data['first_name'].append(first_name)
        data['last_name'].append(last_name[1:])
        data['birthts'].append(birthts)
        data['img_path'].append(img_path)

    return data


All_Data =  pd.DataFrame(get_data(), columns=['user_id', 'first_name', 'last_name', 'birthts', 'img_path'])

All_Data.to_csv('Data.csv', sep=',', index = False)
