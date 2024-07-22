# main.py
import json

def load_dictionary(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_dictionary(file_path, dictionary):
    with open(file_path, 'w') as file:
        json.dump(dictionary, file, ensure_ascii=False, indent=4)

def add_word(dictionary, santali_word, english_meaning):
    dictionary[santali_word] = english_meaning

def get_meaning(dictionary, santali_word):
    return dictionary.get(santali_word, "Word not found in the dictionary.")

def main():
    dictionary = load_dictionary('sat_en_dictionary.json')

    while True:
        print("\nsat-en Dictionary (Santali-English Dictionary)")
        print("1. Add Word")
        print("2. Get Meaning")
        print("3. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            santali_word = input("Enter the Santali word: ")
            english_meaning = input("Enter the English meaning: ")
            add_word(dictionary, santali_word, english_meaning)
            save_dictionary('sat_en_dictionary.json', dictionary)
            print(f"Word '{santali_word}' added to the dictionary.")
        elif choice == '2':
            santali_word = input("Enter the Santali word: ")
            print(f"Meaning: {get_meaning(dictionary, santali_word)}")
        elif choice == '3':
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
    