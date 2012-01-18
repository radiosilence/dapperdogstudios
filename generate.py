#!/usr/bin/python2

from glob import glob
import markdown
from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('templates'))


class Section(object):

    def __init__(self, filename):
        self.filename = filename

    @property
    def html(self):
        contents = open(self.filename).read()
        return markdown.markdown(contents)

    @property
    def name(self):
        return ''.join(''.join(
            self.filename.split('/')[-1].split('.')[:-1]).split('_')[1:])

    @property
    def slug(self):
        return self.name.replace("'", "_")

    @property
    def title(self):
        return " ".join(
            [word.capitalize() for word in self.name.split('-')])


sections = []
filenames = []
for filename in glob('sections/*.md'):
    filenames.append(filename)
filenames.sort()
print env.get_template('main.html').render(
    sections=[Section(filename) for filename in filenames]
)