import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import re
import json

def convert_epub(epub_name):
    book = epub.read_epub(epub_name)
    html_arr = book.get_items_of_type(ebooklib.ITEM_DOCUMENT)
    res_arr = []

    for doc in html_arr:
        content = BeautifulSoup(doc.get_content(),'html.parser')
        if(content.h2): res_arr.append(content.h2.get_text())
        for p in content.find_all('p'):
            for sentence in re.findall("[^\.\?!]+[\.\?!][\"\”]?",p.get_text().replace('\n','').replace('/t','').replace('  ', ' ').replace('Mr.','Mr').replace('Mrs.','Mrs')):
                res_arr.append(sentence)


    json_string = json.dumps(res_arr)

    return json_string