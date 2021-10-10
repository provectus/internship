import csv
import os
import time


class processing:

    def __init__(self, source_data_path: str):
        """
        Source_data_path is the path where source data are located
        """
        self.source_data_path = source_data_path

    def get_age(self, birth_date: float):
        birth_date = float(birth_date)
        current_time = time.time() * 1000
        return (current_time - birth_date) / (3.154 * 10 ** 10)


    def filter_data(self, is_image_exists: int, min_age: float, max_age: float):
        """
        Filter_data applies for data after processing (output.csv)
        is_image_exists: 1 => return users that have images, 0 => they don't have, -1 => return both
        min_age: return users that their ages in years is higher than min age, input is float or -1 if we don't want to apply this filter
        max_age: return users that their ages in years is less than max age, input is float or -1 if we don't want to apply this filter

        this filter also provide the possibility to apply filters together (Ex: users who don't have images and thier age is between 20 and 40)
        Also it is possible to apply exactly two filters (Ex: users who have images and thier min age is 30)
        """
        min_age = float(min_age)
        max_age = float(max_age)
        records = []
        with open('output.csv', 'r') as file:
                file = open("output.csv")
                csvreader = csv.reader(file)
                next(csvreader, None)
                #h = next(csvreader)
                for record in csvreader:
                    if len(record) != 0:
                        records.append(record)
        file.close()

        data = []


        if is_image_exists == 1:
            if min_age != -1:
                if max_age != -1:
                    for record in records:
                        if record[4] != 'Empty' and float(self.get_age(record[3])) >= min_age and  float(self.get_age(record[3])) <= max_age:
                            data.append(record)
                else:
                    for record in records:
                        if record[4] != 'Empty' and float(self.get_age(record[3])) >= min_age:
                            data.append(record)
            elif max_age != -1:
                for record in records:
                        if record[4] != 'Empty' and float(self.get_age(record[3])) <= max_age:
                            data.append(record)
            else:
                if record[4] != 'Empty':
                            data.append(record)
        elif is_image_exists == 0:
            if min_age != -1:
                if max_age != -1:
                    for record in records:
                        if record[4] == 'Empty' and float(self.get_age(record[3])) >= min_age and  float(self.get_age(record[3])) <= max_age:
                            data.append(record)
                else:
                    for record in records:
                        if record[4] == 'Empty' and float(self.get_age(record[3])) >= min_age:
                            data.append(record)
            elif max_age != -1:
                for record in records:
                        if record[4] == 'Empty' and float(self.get_age(record[3])) <= max_age:
                            data.append(record)
            else:
                if record[4] == 'Empty':
                            data.append(record)
        else:
            if min_age != -1:
                if max_age != -1:
                    for record in records:
                        if float(self.get_age(record[3])) >= min_age and float(self.get_age(record[3])) <= max_age:
                            data.append(record)
                else:
                    for record in records:
                        if float(self.get_age(record[3])) >= min_age:
                            data.append(record)
            elif max_age != -1:
                for record in records:
                        if float(self.get_age(record[3])) <= max_age:
                            data.append(record)
            else:
                for record in records:
                    data.append(record)

        filtered = {
            record[0]: {
                'first_name': record[1],
                'last_name': record[2],
                'birthts': record[3],
                'img_path': record[4],
            } for record in data
        }

        return filtered


    def add_single_entry(self, new_record: dict):
        '''
        Add single entry to output file by the following steps
        1) new_record is a dictionary containing info about one user
        2) If the file output.csv exists we take all records except the one which have the same id as new_record to avoid duplicate records
        3) If the file output.csv doesn't exist we move directly to '6'
        4) Delete output.csv if exists
        5) Add new_record to the list of other records
        6) write to output.csv
        '''

        records = []
        headers = ['user_id', 'first_name', ' last_name', ' birthts', 'image_path']
        
        if os.path.isfile('output.csv'):
            with open('output.csv', 'r') as file:
                file = open("output.csv")
                csvreader = csv.reader(file)
                next(csvreader, None)
                #h = next(csvreader)
                for record in csvreader:
                    if len(record) != 0:
                        records.append(record)
            file.close()
            os.remove('output.csv')

        
        with open('output.csv', 'w', newline='') as writefile:
            csv_writer = csv.writer(writefile)

            csv_writer.writerow(headers)

            data = []

            for record in records:
                if len(record) != 0:
                    if record[0] != str(new_record['user_id']):
                        data.append(record)
            
            new_record = [new_record['user_id'], new_record['first_name'], new_record['last_name'],new_record['birthts'], new_record['img_path']]

            data.append(new_record)

            csv_writer.writerows(data)

            writefile.close()


    def combine(self):
        """
        Read all data from source_data_path and combine it in one csv file (output.csv)

        """

        directory = self.source_data_path

        csv_files , images = [] , []

        # Take all files (csv and images) from source directory and get their id's 
        for root,dirs,files in os.walk(directory):
            for file in files:
                if file.endswith(".csv"):
                    csv_files.append((f'{self.source_data_path}/{file}',file[:file.find('.')]))
                else:
                    images.append((f'{self.source_data_path}/{file}',file[:file.find('.')]))
        
        # Attach each image to it's user and add them to output file using new_record function
        for csv_file, id in csv_files:
            with open(f'{self.source_data_path}/{csv_file}', 'r') as file:
                csvreader = csv.reader(file)
                record = next(csvreader)
                for data in csvreader:
                    new_user = {
                        'user_id': id,
                        'first_name': data[0],
                        'last_name': data[1],
                        'birthts': data[2]
                    }
                    try:
                        img_path = [image[0] for image in images if image[1] == id][0]
                        new_user['img_path'] = img_path
                    except:
                        new_user['img_path'] = 'Empty'
                    self.add_single_entry(new_user)



if __name__ == "__main__":
    d = processing('../02-src-data')
    d.combine()
    p = d.filter_data(1,20,25)
    print(p)
