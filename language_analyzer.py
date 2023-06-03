import pickle
from Detect import Plagiarism
from collections import defaultdict


class Analyzer:
    def __init__(self, extraction_directory, project_name):
        self.project_name = project_name
        self.extraction_directory = extraction_directory

    def analyze_language(self):
        temporary_dict = defaultdict(lambda: 0)
        plagiarism_object = Plagiarism(self.extraction_directory, project_name=self.project_name)
        directory_graph = plagiarism_object.directory_graph
        for x in directory_graph:
            for i in directory_graph[x]['files']:
                if '.' in i and i.count('.') == 1:
                    extension = i.split(".")[-1]
                    temporary_dict[extension] += 1
        with open('extension_mapping.pkl', 'rb') as fp:
            extension_mapping = pickle.load(fp)
        return extension_mapping[max(temporary_dict.items(), key=lambda value: value[1])[0]]

