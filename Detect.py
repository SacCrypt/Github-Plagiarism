import os
import pickle
import jellyfish
from feature_extract import SemanticAnalysis
import json


class Plagiarism:

    def __init__(self, extraction_directory, language_used=None, project_name=None):
        self.language_used = language_used
        self.project_name = project_name
        self.extraction_directory = extraction_directory
        with open('extension_mapping.pkl', 'rb') as fp:
            self.extension_mapping = pickle.load(fp)
        with open('../extensions.json') as prog_lang:
            self.json_data = json.load(prog_lang)
        self.semantic_results, self.directory_graph = self.traverse_directory(os.path.join(self.extraction_directory,
                                                                                           self.project_name))

    def traverse_directory(self, directory):
        graph = {}
        dirs_to_be_ignored = {'.git', '__pycache__'}
        semantic_results = set()
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in dirs_to_be_ignored]
            temp = []

            for f in files:
                if f.count('.') == 1 and f.split('.')[-1] in self.extension_mapping:
                    if self.language_used:
                        if '.' + f.split('.')[-1] in self.json_data['name'][self.language_used]:
                            data = SemanticAnalysis.extract_names(os.path.join(root, f))
                            semantic_results = semantic_results.union(data)
                    temp.append(f)

            files[:] = temp
            root_dir = root.strip().split("/")[-1]
            # print(f"root: {root_dir}, dirs:{dirs}, files:{files}")

            graph[root_dir] = {'directories': [], 'files': []}

            for dir_name in dirs:
                graph[root_dir]['directories'].append(dir_name)

            for file_name in files:
                graph[root_dir]['files'].append(file_name)

        return semantic_results, graph

    def analyze(self, path):
        total_similarities = 0
        suspected_semantic_results, suspected_project_graph = self.traverse_directory(path)
        iterations = max(len(self.directory_graph), len(suspected_project_graph)) * 3
        print(self.directory_graph)
        print("*" * 150)
        print(suspected_project_graph)
        for dir1, dir2 in zip(self.directory_graph, suspected_project_graph):
            # print(dir1, dir2)
            if dir1 and dir2:
                if jellyfish.jaro_winkler_similarity(dir1, dir2) >= 0.80:
                    total_similarities += 1
                if abs(len(self.directory_graph[dir1]['directories']) -
                       len(suspected_project_graph[dir2]['directories'])) <= 3:
                    total_similarities += 1
                if abs(len(self.directory_graph[dir1]['files']) -
                       len(suspected_project_graph[dir2]['files'])) <= 3:
                    total_similarities += 1
        print(self.semantic_results)
        print("*" * 125)
        print(suspected_semantic_results)
        return len(self.semantic_results.intersection(suspected_semantic_results)) / len(self.semantic_results.union(
            suspected_semantic_results)), total_similarities / iterations
