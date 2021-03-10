{{- define "provectus-flaskapp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "provectus-flaskapp.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "provectus-flaskapp.labels" -}}
helm.sh/chart: {{ include "provectus-flaskapp.chart" . }}
{{ include "provectus-flaskapp.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "provectus-flaskapp.selectorLabels" -}}
app.kubernetes.io/name: flaskapp
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
