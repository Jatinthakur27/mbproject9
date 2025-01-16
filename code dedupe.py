from tkinter import Tk
from tkinter.filedialog import askdirectory

import os

import hashlib
Tk().withdraw()
path=askdirectory(title="data demimeograph using python")

walker=os.walk(path)

uniqueFiles=dict()
import os

# directory/folder path
dir_path = 'D:\dedupe'

# list to store files
res = []

# Iterate directory
for file_path in os.listdir(dir_path):
    # check if current file_path is a file
    if os.path.isfile(os.path.join(dir_path, file_path)):
        # add filename to list
        res.append(file_path)
print(res)


for folder,sub_folder,files in walker:
    for file in files:
        
        filepath=os.path.join(folder,file)
        #hashdigest is used to convert large numbers into hexadecimal
        filehash=hashlib.md5(open(filepath,"rb").read()).hexdigest()
        
        if filehash in uniqueFiles:
            os.remove(filepath)
            print("the deleted files are:")
            print(f"{filepath}has been deleted")
        else:
            uniqueFiles[filehash]=path