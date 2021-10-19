import unittest
import sys
sys.path.append("/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/")
from Level1.image_path_finder import process
import util


class TestImagePathFinder(unittest.TestCase):

    def test_output_validity(self):
        process(util.input_path_test_data, util.output_path_test_data)
        self.assertEqual(util.get_csv(util.output_path_test_data + "/output.csv"), [['user_id', 'first_name', 'last_name', 'birthts', 'img_path'], ['1000', 'Susan', 'Lee', '612302400000', '/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/unittests/demo-data/1000.png'], ['1001', 'Rosa', 'Garcia', '670626000000', '/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/unittests/demo-data/1001.png'], ['1002', 'Nathan', 'Emery', '697237200000', '/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/unittests/demo-data/1002.png'], ['1003', 'Vernon', 'Evans', '633733200000', '/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/unittests/demo-data/1003.png'], ['1004', 'Maria', 'Crooks', '1051214400000', 'None'], ['1005', 'Sharon', 'Lang', '700606800000', '/home/ehsan2754/git_workspace/provectus task/provectus-internship-task/Level1/unittests/demo-data/1005.png']])