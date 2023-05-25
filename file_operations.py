import os
import shutil


class FileOperations:
    def __init__(self, zip_file, extraction_directory, extension, project_name):
        self.WORKING_DIRECTORY = os.getcwd()
        self.project_name = project_name
        self.extraction_directory = extraction_directory
        self.extension = extension
        self.zip_file = zip_file
        self.zip_file_path = os.path.join(self.extraction_directory, self.project_name)

    def save_file(self):
        self.zip_file.save(self.zip_file_path)
        try:
            self.unpack()
        except Exception as e:
            print("There was an error saving the file")
            print(e)

    def unpack(self):
        try:
            shutil.unpack_archive(self.zip_file_path, self.extraction_directory)
            os.remove(self.zip_file_path)
        except Exception as e:
            print("There was an error unpacking the file")
            print(e)

    @staticmethod
    def make_directory(current_directory, directory_name):
        try:
            os.mkdir(os.path.join(current_directory, directory_name))
        except Exception as e:
            print(e)
