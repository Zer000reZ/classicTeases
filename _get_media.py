try:
    from win32com.client import Dispatch
except ModuleNotFoundError:
    print('use "pip install win32com" to get a shortcut to the json-file')
import sys, os
import re, json
import requests
from tkinter import filedialog as fd


def main(path):
    with open(path, 'r', encoding='ansi') as file:
        data = json.load(file)

    dir_name = path.replace('/', '\\').split('\\')[-1][:-5]
    
    if not os.path.isdir('_pics'):
        os.mkdir('_pics')
    if not os.path.isdir('_pics\\'+dir_name):
        os.mkdir('_pics\\'+dir_name)

    if data['oeosmeta']['typ'] in ('eos', 'flash'):
        if 'galleries' in data:
            for k,v in data['galleries'].items():
                gal_name = v["name"]
                if not os.path.isdir(fr'_pics\{dir_name}\{gal_name}'):
                    os.mkdir(fr'_pics\{dir_name}\{gal_name}')
                for i in v['images']:
                    _hash = i["hash"]
                    print(f'Downloading img {_hash}', end='\r')
                    download_file(_hash+'.jpg', fr'_pics\{dir_name}\{gal_name}\{_hash}.jpg')
        if 'files' in data:
            for k,v in data['files'].items():
                print(f'Downloading img {k}', end='\r')
                download_file(f'{v["hash"]}.{k.split(".")[-1]}', fr'_pics\{dir_name}\{k}', 'image' in v['type'])

    else:#classic / audio
        for k,v in data['pages'].items():
            print(f'Downloading {k}', end='\r')
            if 'img' in v and v['img']:
                download_file(v['img']+'.jpg', fr'_pics\{dir_name}\{k}.jpg')
            if 'audio' in v and v['audio']:
                download_file(v['audio']+'.mp3', fr'_pics\{dir_name}\{k}.mp3', False)

    try:
        shell = Dispatch('WScript.Shell')
        shortcut = shell.CreateShortCut(fr'_pics\{dir_name}\_script.json.lnk')
        shortcut.Targetpath = path
        shortcut.save()
    except Exception:
        print('Shortcut for', path, 'failed')

def download_file(suburl:str, filename:str, image:bool = True):
    '''start of url is provided as https://media.milovana.com/timg/ and += tb_xl/ if image'''
    with open(filename, 'wb') as file:
        file.write(requests.get(
            f'https://media.milovana.com/timg/{"tb_xl/" if image else ""}{suburl}').content)

if __name__ == '__main__':
    print('Drag the json files on this file OR choose in explorer')
    try:
        if len(sys.argv) > 1:
            files = sys.argv[1:]
        else:
            files = fd.askopenfilenames(filetypes=[('JSON', '.json')])
        for i in files:
            main(i)
    except Exception as e:
        input(e)
# add hash & id to media-file and hash to folder
