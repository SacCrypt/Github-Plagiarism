from github import Github
import os
import git
from language_analyzer import Analyzer


class Git:
    def __init__(self, extraction_directory, project_name):
        self.extraction_directory = extraction_directory
        self.project_name = project_name

        self.repo = git.Repo.init(self.extraction_directory)

        self.ACCESS_TOKEN = os.environ.get('GITHUB_ACCESS_TOKEN')
        self.github_session = Github(self.ACCESS_TOKEN)

        analyzer_object = Analyzer(self.extraction_directory, self.project_name)
        self.language_used = analyzer_object.analyze_language()

    def search_repository(self):
        if self.check_rate():
            query = f'{self.project_name[:-5]} language:{self.language_used}'
            print(f'Searching repositories with query --> {query}')
            repositories = self.github_session.search_repositories(f'{query}')
            print(f'Found {repositories.totalCount} repo(s)')
            return repositories
        return None

    def check_rate(self):
        rate_limit = self.github_session.get_rate_limit()
        rate = rate_limit.search
        if rate.remaining == 1:
            print(f"API calls remaining --> {rate.remaining}/{rate.limit}. Reset time: {rate.reset}")
            return False
        else:
            print(f"API calls remaining --> {rate.remaining}/{rate.limit}")
            return True

    def clone_repository(self, repo):
        git.Repo.clone_from(url=repo.clone_url, to_path=os.path.join(self.extraction_directory, repo.name))
        # print("Done Cloning")
