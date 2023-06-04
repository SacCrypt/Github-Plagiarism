import os
import shutil
import zipfile

from logger import logger


class FileOperations:
    def __init__(self, zip_file, extraction_directory, extension, project_name):
        self.WORKING_DIRECTORY = os.getcwd()
        self.project_name = project_name
        self.extraction_directory = extraction_directory
        self.extension = extension
        self.zip_file = zip_file
        self.zip_file_path = os.path.join(self.extraction_directory, self.project_name)

    def save_file(self):
        logger.debug("Saving file...")
        self.zip_file.save(self.zip_file_path)
        try:
            self.unpack()
            logger.info("Successfully unpacked archive")
        except zipfile.BadZipfile:
            logger.error("Corrupted or Invalid ZIP file.", exc_info=True)

    def unpack(self):
        logger.debug("Unpacking compressed file.")
        try:
            shutil.unpack_archive(self.zip_file_path, self.extraction_directory)
            logger.debug("Removing archive")
            os.remove(self.zip_file_path)
        except shutil.ReadError:
            logger.error("Error reading the archive file", exc_info=True)
        except PermissionError:
            logger.error("Permission error", exc_info=True)
        except FileNotFoundError:
            logger.error("Archive file not found", exc_info=True)
        except OSError:
            logger.error("Error removing the file", exc_info=True)

    @staticmethod
    def make_directory(current_directory, directory_name):
        logger.debug("Creating project directory")
        try:
            os.mkdir(os.path.join(current_directory, directory_name))
        except OSError:
            logger.error("Unable to create directory", exc_info=True)
