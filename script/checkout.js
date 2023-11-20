


window.onload = evt =>{
    const session_product = sessionStorage.getItem('ecom-footwear-checkout-item');
    if(session_product){
        const cart_product = JSON.parse(session_product);   //JSON.parse turns any  string to a proper javaScript Object. 
        console.log(cart_product);

        amount_to_pay = calculateAmountToPay(cart_product);
        console.log(amount_to_pay)

        const payment_form = document.querySelector('.payment-form');
        payment_form['amount'].value =  `$${amount_to_pay.toFixed(2)}`;

        const btn_span = payment_form.querySelector('.next-btn')

        btn_span.addEventListener('click', evt =>{
            const stage2_div = payment_form.querySelector('#stage-2')
            const stage1_div = btn_span.parentElement;
    
            
            stage1_div.classList.add('animate-pop-in');
            setTimeout(() => {
                stage1_div.classList.remove('animate-pop-in');
                stage1_div.classList.add('hide');
                },
            150);
    
            stage2_div.classList.remove('hide');
            //Add the animation class
            stage2_div.classList.add('animate-pop-out');
            setTimeout(() => {
                stage2_div.classList.remove('animate-pop-out');
                },
            300);
            
        
        })
        

    }else{
        alert('empty cart session');
        window.location.href= './index.html'
    }

        
}


function calculateAmountToPay(products){
    const amount_to_pay = products.reduce((total, item) =>{
        return total + item['amount']
    },
    0);
    return amount_to_pay;
}

