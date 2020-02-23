import csv
import json
import sys

def main():
    filename = sys.argv[1]
    with open(filename, "r") as inp:
        data = json.load(inp)

    print("What file would you like to save the CSV?")
    out_file = input()

    student_emails = set()

    with open(out_file, "w") as out:
        writer = csv.writer(out)
        writer.writerow(list(data[0].keys()))
        for entry in data:
            if entry["student_email"] in student_emails:
                continue
            else:
                writer.writerow(entry.values())
                student_emails.add(entry["student_email"])

if __name__ == "__main__":
    main()
