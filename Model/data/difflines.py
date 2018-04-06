import sys

if len(sys.argv) != 4:
    print("usage: lines.py file1 file2 file3")
    sys.exit(1)

with open(sys.argv[1]) as f:
    file_1 = [line.rstrip() for line in f]

with open(sys.argv[2]) as f:
    file_2 = [line.rstrip() for line in f]

with open(sys.argv[3]) as f:
    file_3 = [line.rstrip() for line in f]

if len(file_1) != len(file_2) or len(file_2) != len(file_3) or len(file_1) != len(file_3) :
    print("files are different length")
    sys.exit(1)

for i in range(len(file_1)):
    if file_1[i] != file_2[i] and file_2[i] != file_3[i] and file_1[i] != file_3[i] :
        print('line {} has a difference in all files'.format(i))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[1], file_1[i]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[2], file_2[i]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[3], file_3[i]))
    elif file_1[i] != file_2[i] :
        print('line {} has a difference between {} and {}'.format(i, sys.argv[1], sys.argv[2]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[1], file_1[i]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[2], file_2[i]))
    elif file_2[i] != file_3[i] :
        print('line {} has a difference between {} and {}'.format(i, sys.argv[2], sys.argv[3]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[2], file_2[i]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[3], file_3[i]))
    elif file_1[i] != file_3[i] :
        print('line {} has a difference between {} and {}'.format(i, sys.argv[1], sys.argv[3]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[1], file_1[i]))
        print('\t\033[1m{}\033[0m\t: {}'.format(sys.argv[3], file_3[i]))

