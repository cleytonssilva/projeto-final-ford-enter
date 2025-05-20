import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RelatorioService } from '../services/relatorio.service';
import { Subscription } from 'rxjs';

Chart.register(...registerables); // Registrar todos os módulos necessários do Chart.js

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit, OnDestroy {
  @ViewChild('gastosMensaisChart') gastosMensaisChartRef!: ElementRef;
  @ViewChild('tendenciasComprasChart') tendenciasComprasChartRef!: ElementRef;

  gastosMensaisChart: Chart | null = null;
  tendenciasComprasChart: Chart | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.carregarDadosRelatorios();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.gastosMensaisChart) {
      this.gastosMensaisChart.destroy();
    }
    if (this.tendenciasComprasChart) {
      this.tendenciasComprasChart.destroy();
    }
  }

  carregarDadosRelatorios(): void {
    // Gastos Mensais
    this.subscriptions.push(this.relatorioService.getGastosMensais().subscribe(data => {
      if (this.gastosMensaisChartRef) {
        this.renderGastosMensaisChart(data);
      }
    }));

    // Tendências de Compras
    this.subscriptions.push(this.relatorioService.getTendenciasCompras().subscribe(data => {
      if (this.tendenciasComprasChartRef) {
        this.renderTendenciasComprasChart(data);
      }
    }));
  }

  renderGastosMensaisChart(data: { labels: string[], valores: number[] }): void {
    if (this.gastosMensaisChart) {
      this.gastosMensaisChart.destroy();
    }
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
    if (this.tendenciasComprasChart) {
      this.tendenciasComprasChart.destroy();
    }
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
}
