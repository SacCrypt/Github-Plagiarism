import pickle
from Detect import Plagiarism
from collections import defaultdict
from logger import logger


class Analyzer:
    def __init__(self, extraction_directory, project_name):
        self.project_name = project_name
        self.extraction_directory = extraction_directory

    def analyze_language(self):
        logger.debug("Analyzing directory for primary programming language...")
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
        primary_language = extension_mapping[max(temporary_dict.items(), key=lambda value: value[1])[0]]
        logger.info(f"Primary language used is {primary_language}")
        return primary_language

