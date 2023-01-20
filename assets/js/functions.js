var totalAtendimentos = 0;
var total = 0;
var vendas = [];
function updateTotal() {

    var total = [];
    total['tunning'] = 0;
    total['reparo'] = 0;
    total['kitReparo'] = 0;
    total['total'] = 0;
    total['descontos'] = 0;

    $("input:checkbox[name=value]:checked").each(function () {
        var valor = this.value;
        var qtd =  1;

        if (this.classList.contains('calcQtd')) {
            var valor = parseInt(this.value);
            var qtd = parseInt($(this).attr('qtd'));

            if (isNaN(qtd)) {
                qtd = 1;
            }

            valor = this.value * qtd;

        } else if(this.classList.contains('calcQtdReparo')) {
            var porKm = 1000;
            var valor = parseInt(this.value);
            var qtd = parseInt($(this).attr('qtd'));

            if (isNaN(qtd)) {
                qtd = 1;
            }
                valor = (porKm * qtd) + valor;
            total['reparo'] += valor;
        } else if(this.classList.contains('calcQtdKit')) {
            var valor = parseInt(this.value);
            var qtd = parseInt($(this).attr('qtd'));

            if (isNaN(qtd)) {
                qtd = 1;
            }
            valor = qtd * valor;
            total['kitReparo'] += parseInt(valor);
        } else if (this.classList.contains('tunning')) {
            var valor = parseInt(this.value);

            if (this.classList.contains('calcQtd')) {
                var qtd = parseInt($(this).attr('qtd'));

                if (isNaN(qtd)) {
                    qtd = 1;
                }
                valor = qtd * valor;
            }
            total['tunning'] += valor
        }

        if (this.classList.contains('desconto5') || this.classList.contains('desconto10')) {
            total['descontos'] += 1;
        }

        total['total']  += parseInt(valor);
    });
    $('.Rstunning').text(`R$ ${total['tunning']}`);
    $('.Rsreparo').text(`R$ ${total['reparo']}`);
    $('.total').text(`R$ ${total['total']}`);
    $('.kitReparo').text(`R$ ${total['kitReparo']}`);
    $('.totalDesconto').text(`R$ ${total['descontos']}`);
    return total;
}

$(function() {
    $('#aviso').modal('toggle');

    $('.qtd').on('change', function(el) {
        var checkbox = $(el.target).parent().find('.calcQtd');

        if (!checkbox[0]) {
        checkbox = $(el.target).parent().find('.calcQtdKit');
            if (!checkbox[0]) {
                checkbox.attr('qtd',this.value);
            }

            if (!checkbox[0]) {
        checkbox = $(el.target).parent().find('.calcQtdReparo');
                checkbox.attr('qtd',this.value);
            }


            checkbox.attr('qtd',this.value);
        }

        if (checkbox.prop('checked')) {
            checkbox.attr('qtd',this.value);
            updateTotal();
        }
    });


    $('#zerarPainel').on('click', function() {
        $('#novoCliente').click();
        let text = "Você deseja excluir seu painel de hoje?\nAperte OK para sim ou Cancelar para não";
        if (confirm(text) == true) {
            localStorage.clear();
            $('.totalPainel').html(`<span class="totalPainel">R$</span>`);

            alert('Excluído com sucesso');
        } else {
            alert('você cancelou a exclusão');
        }
    });

    $('#painel').on('click', function() {
        $('#novoCliente').click();
        const data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let vendasDia = 'total';
        let vendasTunning = 'tunning';
        let vendasReparo = 'reparo';
        let vendasKit= 'kitReparo';
        let vendasDesconto = 'descontos';
        var getItens = JSON.parse(localStorage.getItem(vendasDia));
        var getItensTunning = JSON.parse(localStorage.getItem(vendasTunning));
        var getItensReparo = JSON.parse(localStorage.getItem(vendasReparo));
        var getItensKitReparo = JSON.parse(localStorage.getItem(vendasKit));
        var getItensDesconto = JSON.parse(localStorage.getItem(vendasDesconto));

        var tunning =  0;
        var reparo = 0;
        var total =  0;
        var descontos = 0;
        var totalMecanica = 0;
        var kitReparo = 0;

        getItens.map(function(item){
            item = parseInt(item);
            total+= item > 0 ? item : 0;
        });

        getItensTunning.map(function(item){
            item = parseInt(item);
            tunning+= item > 0 ? item : 0;
        });

        getItensReparo.map(function(item){
            item = parseInt(item);
            reparo+= item > 0 ? item : 0;
        });

        getItensKitReparo.map(function(item){
            item = parseInt(item);
            kitReparo+= item > 0 ? item : 0;
        });

        getItensDesconto.map(function(item){
            item = parseInt(item);
            descontos+= item > 0 ? item : 0;
        });

        totalMecanica = total * 30 /100;


        var html = `Reparos: ${reparo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br>
                    Tunning: ${tunning.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br>
                    Kit reparo: ${kitReparo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} <br>
                    QTD descontos: ${descontos}<br>
                    Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}<br>
                    Painel 30%: ${totalMecanica.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
        $('.totalPainel').html(`${html}`);
    });

    $('#novoCliente').on('click', function(){
        var descontoAux = $('.desconto:checked').prop('checked') ? 1 : 0;
        $('.qtd').val('');
        $('.desconto:checked').prop('checked',false);
        $('input:checkbox[name=value]:checked').prop('checked',false);
        var totalAux = $('.total').text().replace('R$ ','');
        var totalAux = $('.total').text().replace('R$','');
        $('.total').text('R$');
        var tunningAux = $('.Rstunning').text().replace('R$ ','');
        $('.Rstunning').text('R$');
        var reparoAux = $('.Rsreparo').text().replace('R$ ','');
        $('.Rsreparo').text('R$');
        var reparoKitAux = $('.kitReparo').text().replace('R$ ','');
        $('.kitReparo').text('R$');
        const data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let vendasDia = 'total'
        let vendasTunning = 'tunning';
        let vendasReparo = 'reparo';
        let vendasKit= 'kitReparo';
        let descontos = 'descontos';

        var mydatas = [];
        mydatas['total'] = [];
        mydatas['tunning'] = [];
        mydatas['reparo'] = [];
        mydatas['descontos'] = [];
        mydatas['kitReparo'] = [];

        var getItens = JSON.parse(localStorage.getItem(vendasDia));
        var getItensTunning = JSON.parse(localStorage.getItem(vendasTunning));
        var getItensReparo = JSON.parse(localStorage.getItem(vendasReparo));
        var getItensDescontos = JSON.parse(localStorage.getItem(descontos));
        var getItensKitReparo = JSON.parse(localStorage.getItem(vendasKit));

        if (!jQuery.isEmptyObject(getItens)) {
            getItens.map(function(item){
                mydatas['total'].push(item);
            });
        }
        mydatas['total'].push(totalAux);

        if (!jQuery.isEmptyObject(getItensTunning)) {
            getItensTunning.map(function(item){
                mydatas['tunning'].push(item);
            });
        }
        mydatas['tunning'].push(tunningAux);

        if (!jQuery.isEmptyObject(getItensReparo)) {
            getItensReparo.map(function(item){
                mydatas['reparo'].push(item);
            });
        }
        mydatas['reparo'].push(reparoAux);

        if (!jQuery.isEmptyObject(getItensDescontos)) {
            getItensDescontos.map(function(item){
                mydatas['descontos'].push(item);
            });
        }

        if (!jQuery.isEmptyObject(getItensKitReparo)) {
            getItensKitReparo.map(function(item){
                mydatas['kitReparo'].push(item);
            });
        }
        mydatas['kitReparo'].push(reparoKitAux);


        localStorage.setItem(vendasDia, JSON.stringify(mydatas['total']));
        localStorage.setItem(vendasTunning, JSON.stringify(mydatas['tunning']));
        localStorage.setItem(vendasReparo, JSON.stringify( mydatas['reparo']));
        localStorage.setItem(descontos, JSON.stringify( mydatas['descontos']));
        localStorage.setItem(vendasKit, JSON.stringify( mydatas['kitReparo']));
    });

    $(".desconto").change(function() {
        var desconto = 0;
        var qtd = 0;
        var valorComDesconto = 0;
        totalAux = updateTotal() ? updateTotal()['total'] : 0;
        var item = this;

        if (this.checked) {
            $('.desconto:checked').prop('checked',false);
            item.checked = true;
        }

        $(".desconto:checked").each(function (e) {
            qtd = parseInt(this.value);
            desconto = totalAux * qtd / 100;
            valorComDesconto = totalAux - desconto;
            $('.total').text(`R$ ${valorComDesconto}`);
        });
    });
});

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    $('#cardBg').toggleClass("bg-dark");
    $('#cardBg2').toggleClass("bg-dark");
}