import pandas as pd
from pathlib import Path
import os

script_path = os.path.realpath(__file__)
root_dir = str(Path(script_path).parent.absolute())
csv_files = []
png_files = []

for root, dirs, files in os.walk(root_dir+"\\02-src-data"):
    for file in files:
        if file.endswith(".png"):
            png_files.append(file)
        elif file.endswith(".csv"):
            csv_files.append(file)
    break

os.makedirs(root_dir+"\\processed_data", exist_ok=True)
output_csv = pd.DataFrame(columns=["first_name", "last_name", "birthts", "img_path"])

for i in range(len(csv_files)):
    user_raw_info = pd.read_csv(root_dir+"\\02-src-data\\"+csv_files[i])
    user_raw_info.rename(lambda str: str.replace(" ",""), axis='columns', inplace=True)
    user_raw_info["img_path"] = [root_dir+"\\02-src-data\\" + png_files[i]]
    output_csv = output_csv.append(user_raw_info)

output_csv.to_csv(root_dir+"\\processed_data\\output.csv", index=False)
