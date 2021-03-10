{{- define "provectus-db.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "provectus-db.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "provectus-db.labels" -}}
helm.sh/chart: {{ include "provectus-db.chart" . }}
{{ include "provectus-db.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "provectus-db.selectorLabels" -}}
app.kubernetes.io/name: db
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
