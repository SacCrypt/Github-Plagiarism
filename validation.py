from werkzeug.utils import secure_filename
from logger import logger


class Sanitize:

    ALLOWED_EXTENSIONS = {
        'compressed': {'zip', 'tar', '7z', 'rar', 'gzip', 'xz', 'taz', 'gz', 'tgz'},
        'flat': {'py'}
    }

    def __init__(self, zip_file):
        self.zip_file = zip_file
        if self.check_file_name():
            self.extension = self.zip_file.filename.rsplit(".")[-1]

    def check_file_name(self):
        logger.debug("Checking file name...")
        if self.zip_file.filename == '' or self.zip_file.filename.count(
                '.') > 1 or not self.zip_file.filename.count(
                '.'):
            logger.warning("Invalid Filename.")
            return False
        else:
            self.zip_file.filename = secure_filename(self.zip_file.filename)
            return True

    def check_allowed_file_types(self):
        logger.debug("Checking allowed file types...")
        for x in Sanitize.ALLOWED_EXTENSIONS:
            if self.extension.lower() in self.ALLOWED_EXTENSIONS[x]:
                return True
        logger.warning("Extension not allowed!")
        return False
