import re

only_words = re.compile(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
catalog_id_specimen = re.compile(r'^[A-Z0-9\s-]+$')
words = re.compile(r'^[a-zA-Z]+$')
hour_regex = re.compile(r'^([01]\d|2[0-3]):([0-5]\d)$')
only_names = re.compile(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+(?:\.[ ]?[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+)*$')
colector_code = re.compile(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+(?:\.[ ]?[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*)*$')
alnum_with_spaces = re.compile(r'^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$')
only_words_with_commas = re.compile(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ,. ]+$')
orcid = re.compile(r'^\d{4}-\d{4}-\d{4}-\d{4}$')
