import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import re
import json

def convert_epub(epub_name):
    book = epub.read_epub(epub_name)
    html_arr = book.get_items_of_type(ebooklib.ITEM_DOCUMENT)
    res_string = ''

    for doc in html_arr:
        res_string = res_string + BeautifulSoup(doc.get_content(),'html.parser').get_text()

    split_string = re.split(r"[;.]\s*", res_string)

    json_string = json.dumps(split_string)

    return json_string