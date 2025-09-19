const tooltips = document.querySelectorAll('.has-tooltip');

const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);

let activeTooltip = null;

tooltips.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const text = link.title;
    const position = link.dataset.position || 'bottom';

    if (activeTooltip === link) {
      tooltip.classList.remove('tooltip_active');
      activeTooltip = null;
      return;
    }

    tooltip.classList.remove('tooltip_active');

    tooltip.textContent = text;
    tooltip.classList.add('tooltip_active');

    const rect = link.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = rect.left + window.pageXOffset;
    let top = rect.bottom + window.pageYOffset + 5;

    switch (position) {
      case 'top':
        top = rect.top + window.pageYOffset - tooltipRect.height - 5;
        left = rect.left + window.pageXOffset;
        break;
      case 'left':
        left = rect.left + window.pageXOffset - tooltipRect.width - 5;
        top = rect.top + window.pageYOffset;
        break;
      case 'right':
        left = rect.right + window.pageXOffset + 5;
        top = rect.top + window.pageYOffset;
        break;
      case 'bottom':
        left = rect.left + window.pageXOffset;
        top = rect.bottom + window.pageYOffset + 5;
        break;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';

    activeTooltip = link;
  });
});