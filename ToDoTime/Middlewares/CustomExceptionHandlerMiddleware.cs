using Microsoft.Net.Http.Headers;
using System.Net;
using System.Text.Json;
using ToDoTime.Domain.Exceptions;

namespace ToDoTime.Application.Middlewares
{
    public class CustomExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomExceptionHandlerMiddleware(
            RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var exData = MapException(exception);

            var responseContent = !string.IsNullOrEmpty(exData.Message) ? exData.Message : JsonSerializer.Serialize(new { error = exception.Message });
            return RewriteResponse(context.Response, exData, responseContent);
        }

        private ExceptionData MapException(Exception exception)
        {
            var data = new ExceptionData(exception.Message);

            var result = exception switch
            {
                BadRequestException => data with { StatusToUse = HttpStatusCode.BadRequest },

                NotFoundException => data with { StatusToUse = HttpStatusCode.NotFound },

                _ => data with { StatusToUse = HttpStatusCode.BadRequest }
            };

            return result;
        }

        private record ExceptionData(
            string Message,
            HttpStatusCode StatusToUse = HttpStatusCode.InternalServerError
        );

        private static Task RewriteResponse(HttpResponse response, ExceptionData data, string responseContent)
        {

            response.Clear();
            response.Headers.SetForceNoCache();
            response.ContentType = "application/json";
            response.StatusCode = (int)data.StatusToUse;

            if (data.StatusToUse == HttpStatusCode.NoContent)
            {
                return Task.CompletedTask;
            }

            return response.WriteAsync(responseContent);
        }
    }

    public static class ResponseHeaderHelper
    {
        public static void SetForceNoCache(this IHeaderDictionary headers)
        {
            headers[HeaderNames.CacheControl] = "no-cache,no-store";
            headers[HeaderNames.Pragma] = "no-cache";
            headers[HeaderNames.Expires] = "-1";
            headers[HeaderNames.ETag] = default;
        }
    }

    public static class CustomExceptionHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionHandlerMiddleware>();
        }
    }
}
