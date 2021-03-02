// Создай плагин настраиваемого таймера,
// который ведет обратный отсчет до предварительно определенной даты.
// Такой плагин может использоваться в блогах и интернет -
// магазинах, страницах регистрации событий, во время технического обслуживания и т.д.

// Плагин ожидает следующую HTML - разметку и
// показывает четыре цифры: дни, часы, минуты и секунды в формате XX: XX: XX: XX.
// Количество дней может состоять из более чем двух цифр.

// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

// Для подсчета значений используй следующие готовые формулы,
// где time - разница между targetDate и текущей датой.

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerRef = document.querySelector(selector);
    this.daysRef = this.timerRef.querySelector('[data-value="days"]');
    this.hoursRef = this.timerRef.querySelector('[data-value="hours"]');
    this.minsRef = this.timerRef.querySelector('[data-value="mins"]');
    this.secsRef = this.timerRef.querySelector('[data-value="secs"]');
    
    function getTime(time) {
      const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
      
      return { days, hours, mins, secs };
    };

    function pad(value) {
      return String(value).padStart(2, '0');
    };
    
    setInterval(() => {
      const time = new Date('Jul 17, 2021') - Date.now();
      this.daysRef.textContent = getTime(time).days;
      this.hoursRef.textContent = getTime(time).hours;
      this.minsRef.textContent = getTime(time).mins;
      this.secsRef.textContent = getTime(time).secs;
    }, 1000);
  };
};

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});