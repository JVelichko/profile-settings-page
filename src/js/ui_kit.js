// Bundle CSS import
import '../scss/app.scss';

// Run your page code here.
const select = document.querySelectorAll('.custom-select');
select.forEach(item => {
  const selectEl = item.querySelectorAll('SELECT')[0];
  const options = selectEl.querySelectorAll('OPTION');

  const selected = document.createElement('div');
  selected.classList.add('custom-select__select');

  const selectedValue = document.createElement('span');
  selected.appendChild(selectedValue);
  selectedValue.innerHTML = item.dataset.placeholder;
  selectEl.value = '';

  item.appendChild(selected);
  const dropdown = document.createElement('div');
  dropdown.classList.add('custom-select__dropdown', 'custom-select_hidden');

  options.forEach(el => {
    const dropdownItem = document.createElement('div');
    dropdownItem.innerHTML = el.innerHTML;

    dropdownItem.addEventListener('click', function () {
      options.forEach((elem, index) => {
        if (elem.innerHTML == this.innerHTML) {
          selectEl.selectedIndex = index;
          selectEl.value = elem.value;
          selectEl.dispatchEvent(new Event('change', { 'bubbles': true }));
          selectedValue.innerHTML = this.innerHTML;

          const activeItem = this.parentNode.querySelector('.active');
          if (activeItem) {
            activeItem.classList.remove('active');
          }
          this.classList.add('active');
        }
      });
    });

    dropdown.appendChild(dropdownItem);
  });

  item.appendChild(dropdown);
  item.addEventListener('click', function () {
    dropdown.classList.toggle('custom-select_hidden');
  });

  function outsideClick(e) {
    if (!item.contains(e.target)) {
      dropdown.classList.add('custom-select_hidden');
    }
  }

  document.addEventListener('click', e => outsideClick(e));
});
