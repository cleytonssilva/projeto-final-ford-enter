import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; // Adicionar AfterViewInit
import { Chart, registerables } from 'chart.js';
import { RelatorioService } from '../services/relatorio.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
// Implementar AfterViewInit
export class RelatoriosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gastosMensaisChart') gastosMensaisChartRef!: ElementRef;
  @ViewChild('tendenciasComprasChart') tendenciasComprasChartRef!: ElementRef;
  @ViewChild('requisicoesPorStatusChart') requisicoesPorStatusChartRef!: ElementRef;
  @ViewChild('gastosPorCategoriaChart') gastosPorCategoriaChartRef!: ElementRef;

  gastosMensaisChart: Chart | null = null;
  tendenciasComprasChart: Chart | null = null;
  requisicoesPorStatusChart: Chart | null = null;
  gastosPorCategoriaChart: Chart | null = null;

  private subscriptions: Subscription[] = [];

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    // Não carregar dados aqui. Apenas para lógica que não depende do DOM.
  }

  // NOVO HOOK: Chamado depois que a view do componente é inicializada
  ngAfterViewInit(): void {
    // Agora é seguro chamar a função de carregamento de dados e renderização dos gráficos
    // pois os ElementRef (canvas) estão garantidos de estarem disponíveis.
    this.carregarDadosRelatorios();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.gastosMensaisChart) { this.gastosMensaisChart.destroy(); }
    if (this.tendenciasComprasChart) { this.tendenciasComprasChart.destroy(); }
    if (this.requisicoesPorStatusChart) { this.requisicoesPorStatusChart.destroy(); }
    if (this.gastosPorCategoriaChart) { this.gastosPorCategoriaChart.destroy(); }
  }

  carregarDadosRelatorios(): void {
    // Gastos Mensais
    this.subscriptions.push(this.relatorioService.getGastosMensais().subscribe(data => {
      // Adicionar uma verificação adicional para garantir que a referência existe
      if (this.gastosMensaisChartRef && this.gastosMensaisChartRef.nativeElement) {
        this.renderGastosMensaisChart(data);
      } else {
        console.warn('Canvas para Gastos Mensais não encontrado.');
      }
    }));

    // Tendências de Compras
    this.subscriptions.push(this.relatorioService.getTendenciasCompras().subscribe(data => {
      if (this.tendenciasComprasChartRef && this.tendenciasComprasChartRef.nativeElement) {
        this.renderTendenciasComprasChart(data);
      } else {
        console.warn('Canvas para Tendências de Compras não encontrado.');
      }
    }));

    // Requisições por Status
    this.subscriptions.push(this.relatorioService.getRequisicoesPorStatus().subscribe(data => {
      if (this.requisicoesPorStatusChartRef && this.requisicoesPorStatusChartRef.nativeElement) {
        this.renderRequisicoesPorStatusChart(data);
      } else {
        console.warn('Canvas para Requisições por Status não encontrado.');
      }
    }));

    // Gastos por Categoria
    this.subscriptions.push(this.relatorioService.getGastosPorCategoria().subscribe(data => {
      if (this.gastosPorCategoriaChartRef && this.gastosPorCategoriaChartRef.nativeElement) {
        this.renderGastosPorCategoriaChart(data);
      } else {
        console.warn('Canvas para Gastos por Categoria não encontrado.');
      }
    }));
  }

  // --- Funções de renderização de gráficos (mantidas as mesmas) ---
  renderGastosMensaisChart(data: { labels: string[], valores: number[] }): void {
    if (this.gastosMensaisChart) { this.gastosMensaisChart.destroy(); }
    this.gastosMensaisChart = new Chart(this.gastosMensaisChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Gastos Mensais (R$)',
          data: data.valores,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderTendenciasComprasChart(data: { labels: string[], valores: number[] }): void {
    if (this.tendenciasComprasChart) { this.tendenciasComprasChart.destroy(); }
    this.tendenciasComprasChart = new Chart(this.tendenciasComprasChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Número de Compras',
          data: data.valores,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderRequisicoesPorStatusChart(data: { labels: string[], valores: number[] }): void {
    if (this.requisicoesPorStatusChart) { this.requisicoesPorStatusChart.destroy(); }
    this.requisicoesPorStatusChart = new Chart(this.requisicoesPorStatusChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Requisições',
          data: data.valores,
          backgroundColor: [
            'rgba(255, 159, 64, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  renderGastosPorCategoriaChart(data: { labels: string[], valores: number[] }): void {
    if (this.gastosPorCategoriaChart) { this.gastosPorCategoriaChart.destroy(); }
    this.gastosPorCategoriaChart = new Chart(this.gastosPorCategoriaChartRef.nativeElement, {
      type: 'polarArea',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Gastos (R$)',
          data: data.valores,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

