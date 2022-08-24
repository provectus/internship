import requests
import re
import pandas as pd

# source path
path_to_folder = "https://raw.githubusercontent.com/provectus/internship/main/dataeng/02-src-data/"

# preparing dataframe with column names
output_data = pd.DataFrame(columns=["user_id", "first_name", "last_name", "birthts", "img_path"])

# bad approach, because indexes are hard coded
for i in range(1000, 1100):
    
    # making requests. it takes about 15-20 seconds to make 100 of them
    r = requests.get(path_to_folder + str(i) + ".csv")
    
    # decoding given raw information
    content = r.content.decode("utf-8")
    content = re.findall(r'\w+', content)
    
    # preparing a row with info for the dataframe
    row = {
        'user_id': i,
        'first_name': content[3],
        'last_name': content[4],
        'birthts': content[5],
        'img_path': path_to_folder + str(i) + ".png"
    }
    
    row = pd.Series(row)
    
    # putting info into dataframe
    output_data = output_data.append(row, ignore_index=True)

# saving dataframe as a csv-file
output_data.to_csv("./output.csv")
