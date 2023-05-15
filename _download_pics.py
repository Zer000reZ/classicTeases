#from win32com.client import Dispatch
import requests
import re
import os

def main(path):
    Pic = {}
    for i in L:
        with open(path, 'rb') as file:
            text = file.read()
        Pic[i] = [i[1]+i[2] for i in re.findall(b'(hash":"([0-9a-f]+)"|img": "([0-9a-f]+)\.)',text)]

    for i in Pic:
        print(f'Starting {i}')
        if not os.path.isdir('_pics'):
            os.mkdir('_pics')
        if not str(i) in os.listdir('_pics'):
            os.mkdir(rf'_pics\{i}')
        for j,o in enumerate(Pic[i]):
            try:
                print(f'Downloading img {j}', end='\r')
                with open(rf'E:\__Blin__\Other\_All_Teases\_pics\{i}\{o.decode()}.jpg', 'wb') as file:
                    file.write(requests.get(f'https://media.milovana.com/timg/tb_xl/{o.decode()}.jpg').content)
            except Exception:
                print(i,j,o)

        #shell = Dispatch('WScript.Shell')
        #shortcut = shell.CreateShortCut(rf'E:\__Blin__\Other\_All_Teases\_pics\{i}\_script.txt.lnk')
        #shortcut.Targetpath = rf'E:\\__Blin__\Other\_All_Teases\{i}.txt'
        #shortcut.save()

if __name__ == '__main__':
    print('Drag the json files on this file OR choose in explorer')
    try:
        if len(sys.argv) > 1:
            files = sys.argv[1:]
        else:
            files = fd.askopenfilenames(filetypes=[('JSON', '.json')])
        for i in files:
            main(path)
    except Exception as e:
        input(e)
