document.addEventListener('DOMContentLoaded', function() {

    // ===== الكود الخاص بتفعيل بطاقات المواعيد =====
    const appointmentCards = document.querySelectorAll('.appointment-card');

    appointmentCards.forEach(card => {
        card.addEventListener('click', () => {
            appointmentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // ===== الكود الخاص بتفعيل أقسام التنقل (Tabs) =====
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault(); // منع السلوك الافتراضي للرابط

            // 1. إزالة فئة 'active' من جميع الألسنة والمحتويات
            tabs.forEach(item => item.classList.remove('active'));
            contents.forEach(item => item.classList.remove('active'));

            // 2. إضافة فئة 'active' إلى اللسان الذي تم النقر عليه
            tab.classList.add('active');

            // 3. إيجاد المحتوى المرتبط وإضافة فئة 'active' له
            const targetId = tab.dataset.tab; // الحصول على القيمة من data-tab
            const targetContent = document.getElementById(targetId + '-content');

            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ===== الكود الجديد الخاص بفتح وإغلاق تفاصيل الدفعات في جدول المالية =====
    // We use event delegation on the document to listen for clicks
    document.addEventListener('click', function(event) {
        // Check if a toggle icon with the class 'toggle-details' was clicked
        if (event.target.classList.contains('toggle-details')) {
            const icon = event.target;
            // Find the closest parent 'invoice-group' to scope our search
            const invoiceGroup = icon.closest('.invoice-group');

            if (invoiceGroup) {
                // Find all installment detail rows ONLY within this specific group
                const installmentRows = invoiceGroup.querySelectorAll('.installment-detail');

                // Toggle the 'hidden' class on each detail row to show/hide them
                installmentRows.forEach(row => {
                    row.classList.toggle('hidden');
                });

                // Change the icon from plus to minus and vice-versa for user feedback
                icon.classList.toggle('fa-plus-circle');
                icon.classList.toggle('fa-minus-circle');
            }
        }
    });

});
