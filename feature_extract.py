import ast


class SemanticAnalysis:
    def __init__(self):
        pass

    @staticmethod
    def extract_names(path):

        with open(path, "r") as file:
            source_code = file.read()

        tree = ast.parse(source_code)

        names = set()

        for node in ast.walk(tree):
            if isinstance(node, ast.Name):
                if isinstance(node.ctx, ast.Store):
                    names.add(node.id)
            elif isinstance(node, ast.FunctionDef):
                names.add(node.name)
                for param in node.args.args:
                    names.add(param.arg)
            elif isinstance(node, ast.ClassDef):
                names.add(node.name)
            elif isinstance(node, ast.Import):
                for alias in node.names:
                    names.add(alias.name.split('.')[0])
            elif isinstance(node, ast.ImportFrom):
                names.add(node.module.split('.')[0])

        return names
