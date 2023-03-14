import data1 from './data.json' assert { type: 'json' };

const summary_table = document.querySelector(".Diagnosis tbody");

//14-03-23
// Dynamicaly changing table in 'Newborn report' page
$('.summary_report_table tfoot td').each( function () {
    var title = $(this).text();
    $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
} );
var table1 = $('.summary_report_table').DataTable({
    data:[],      
    columns: [
        { data: "Gene" },
        { data: "Location" },
        { data: "Disease" },
        { data:  "Mutation" },
        { data: "Zygosity" },
        { data: "Classification" },
        { data: "Patients" },
        { data: "Frequency" },  
    ],
    order: [[7, 'desc']],
    searching:true,
    initComplete: function () {
        // Apply the search
        this.api()
            .columns()
            .every(function () {
                var that = this;

                $('input', this.footer()).on('keyup change clear', function () {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
    },
});
$('.summary_report_table tfoot').insertAfter($('.summary_report_table thead'))

var table2 = $('.Top_gene_table').DataTable({
    data: [],
    columns: [
        { data: "Gene" },
        { data: "Mutation" },
        { data: "Frequency" },  
    ],
    order: [[2, 'desc']],
    searching: true
});

var table3 = $('.Top_mutation_table').DataTable({
    data: [],
    columns: [
        { data: "Gene" },
        { data: "Mutation" },
        { data: "Patients" },  
    ],
    order: [[2, 'desc']],
    searching: true
});

//14-03-23

// Initiate disease name
var disease= document.querySelector("#patientInput").value
load_content(disease);


// Disease changer
$('#patientInput').change(function (e) { 
var disease=this.value
load_content(disease);
});





// Loading content based on disease
function load_content(disease){
    var num_mut=[]
    var num_gene=[]
    for(var j=0;j<data1.data.length;j++){
        num_gene.push(data1.data[j].Gene)
        num_mut.push(data1.data[j].Mutation)
    }
    var num_mut_val=removeDuplicates(num_mut).length
    var num_gene_val=removeDuplicates(num_gene).length

    // header row
    document.querySelector("#newbornNameMetaDisease").innerHTML=disease
    document.querySelector("#newbornPatVariantCount").innerHTML=num_mut_val
    document.querySelector("#uniqueMutatedGenes").innerHTML=num_gene_val
    document.querySelector('#newbornSampCount').innerHTML=data1.data.length



    // filter dataset corespond to the selected disease
    var data=data1.data.filter(ele =>
        ele.Disease === disease
    )
   


    // Diagnosis summary table //
    var sum_table=""
    for(var i=0;i<data.length;i++){
        sum_table+=`<tr>
        <td class="dia-gene text-center" >${data[i].Gene}</td>
        <td class="dia-pat-count text-center">${data[i].Mutation}</td>
        <td class="dia-rv-count text-center">${data[i].Zygosity}</td>
        </tr>`
    }
    summary_table.innerHTML=sum_table
    $('.p1_sum_loader').hide();





    // summary column //
    function removeDuplicates(arr) {
        return [...new Set(arr)];
    }


    var gene=[]
    var mutation=[]
    var zygosity=[]

    for(var i=0;i<data.length;i++){
        gene.push(data[i].Gene)
        mutation.push(data[i].Mutation)
        zygosity.push(data[i].Zygosity)
    }

    gene= removeDuplicates(gene)
    mutation= removeDuplicates(mutation)
    zygosity=removeDuplicates(zygosity)

    const summary_gene= document.querySelector("#gene_inv");
    const summary_mut= document.querySelector("#mut_inv");
    const summary_zyg= document.querySelector("#zyg_inv");
    document.querySelector("#disease").innerHTML=disease

    summary_gene.innerHTML=gene
    summary_mut.innerHTML=mutation
    summary_zyg.innerHTML=zygosity




//Gene & Mutation Information
    var Gene_det=[]
    for(var i=0;i<gene.length;i++){
        for(var j=0;j<data.length;j++){
            if(gene[i]===data[j].Gene){
                var ii={}
                ii["Gene"]=gene[i]
                ii["Gene_exp"]=data[j].Gene_info
                Gene_det.push(ii)
                break
            }
        }
    }

    var Mut_det=[]
    for(var i=0;i<mutation.length;i++){
        for(var j=0;j<data.length;j++){
            if(mutation[i]===data[j].Mutation){
                var ii={}
                ii["Mutation"]=mutation[i]
                ii["Mutation_exp"]=data[j].Mut_info
                Mut_det.push(ii)
                break
            }
        }
    }


    var gene_txt=``
    for(var i=0;i<Gene_det.length;i++){
        gene_txt+=`<li>
            <div><a class="collapsed" data-bs-toggle="collapse" href="#collapse-gene-${i}">${Gene_det[i].Gene} ⓘ</a></div>
            <div id='collapse-gene-${i}' class='collapse'>${Gene_det[i].Gene_exp}</div>
            </li>`
    }
    var mutation_txt=``
    for(var i=0;i<Mut_det.length;i++){
        mutation_txt+=`<li>
            <div><a class="collapsed" data-bs-toggle="collapse" href="#collapse-${i}">${Mut_det[i].Mutation} ⓘ</a></div>
            <div id='collapse-${i}' class='collapse'>${Mut_det[i].Mutation_exp}</div>
            </li>`
    }


    document.querySelector(".gene_info span ul").innerHTML=gene_txt
    document.querySelector(".mutation_info span ul").innerHTML=mutation_txt

//Gene & Mutation Information - end


    //---------------------------------- Newborn Report ------------------------------------------------------------//


    $(document).ready(function () {
        /*
        $('.summary_report_table tfoot td').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        } );

        $('.summary_report_table').DataTable({
            ajax: 'assets/js/data.json',      
            columns: [
                { data: "Gene" },
                { data: "Location" },
                { data: "Disease" },
                { data:  "Mutation" },
                { data: "Zygosity" },
                { data: "Classification" },
                { data: "Patients" },
                { data: "Frequency" },  
            ],
            order: [[7, 'desc']],

            initComplete: function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;
    
                        $('input', this.footer()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
        });
        $('.summary_report_table tfoot').insertAfter($('.summary_report_table thead'))

*/
        
        

            $.ajax({
                url: 'assets/js/data.json',
                dataType: 'json',
                success: function(data) {
                    var filteredData = data.data.filter(function(row) {
                        return row.Disease === disease;
                    });
                    //----------Report total table------//
                    table1.clear().rows.add(filteredData).draw();
                    //----------Top-gene-table----------//
                    table2.clear().rows.add(filteredData).draw();

                    //-----------Top-Mutation-table-------------//
                    table3.clear().rows.add(filteredData).draw();
                    
                    //
                }
            });
//-----------------------------------------top-gene---------------------//      
       








    });
};


