import json
import os

def load_dictionary(file_path):
    """Load the dictionary from a JSON file."""
    if not os.path.exists(file_path):
        return {"santali_to_english": {}, "english_to_santali": {}}
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def save_dictionary(file_path, dictionary):
    """Save the dictionary to a JSON file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(dictionary, file, ensure_ascii=False, indent=4)

def add_word(dictionary, santali_word, english_meaning):
    """Add a new word and its meaning to the dictionary."""
    dictionary["santali_to_english"][santali_word] = english_meaning
    dictionary["english_to_santali"][english_meaning] = santali_word

def get_meaning(dictionary, word):
    """Get the meaning of a word from the dictionary."""
    if word in dictionary["santali_to_english"]:
        return dictionary["santali_to_english"][word], "Santali to English"
    elif word in dictionary["english_to_santali"]:
        return dictionary["english_to_santali"][word], "English to Santali"
    else:
        return "Word not found in the dictionary.", None

def main():
    """Main function to run the dictionary application."""
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
            print(f"Word '{santali_word}' (Santali) -> '{english_meaning}' (English) has been added to the dictionary.")
        elif choice == '2':
            word = input("Enter the word to search: ").strip()
            meaning, direction = get_meaning(dictionary, word)
            if direction:
                print(f"Meaning ({direction}): {meaning}")
            else:
                print(meaning)
        elif choice == '3':
            print("Exiting the dictionary. Goodbye!")
            break
        else:
            print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
