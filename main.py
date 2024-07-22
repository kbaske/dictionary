# main.py
import json
import os

def load_dictionary(file_path):
    """Load the dictionary from a JSON file."""
    if not os.path.exists(file_path):
        return {}
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def save_dictionary(file_path, dictionary):
    """Save the dictionary to a JSON file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(dictionary, file, ensure_ascii=False, indent=4)

def add_word(dictionary, santali_word, english_meaning):
    """Add a new word and its meaning to the dictionary."""
    dictionary[santali_word] = english_meaning

def get_meaning(dictionary, santali_word):
    """Get the meaning of a word from the dictionary."""
    return dictionary.get(santali_word, "Word not found in the dictionary.")

def main():
    """Main function to run the dictionary application."""
    # Define the file path for the dictionary JSON file
    dictionary_file = os.path.join(os.path.dirname(__file__), 'sat_en_dictionary.json')
    dictionary = load_dictionary(dictionary_file)

    while True:
        print("\nWelcome to the sat-en Dictionary (Santali-English Dictionary)")
        print("1. Add Word")
        print("2. Get Meaning")
        print("3. Exit")
        choice = input("Enter your choice (1/2/3): ")

        if choice == '1':
            santali_word = input("Enter the Santali word: ").strip()
            english_meaning = input("Enter the English meaning: ").strip()
            add_word(dictionary, santali_word, english_meaning)
            save_dictionary(dictionary_file, dictionary)
            print(f"Word '{santali_word}' has been added to the dictionary.")
        elif choice == '2':
            santali_word = input("Enter the Santali word: ").strip()
            meaning = get_meaning(dictionary, santali_word)
            print(f"Meaning: {meaning}")
        elif choice == '3':
            print("Exiting the dictionary. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
